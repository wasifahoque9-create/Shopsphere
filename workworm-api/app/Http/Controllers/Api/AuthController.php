<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;

class AuthController extends Controller
{
    /**
     * Register a new customer.
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|email|unique:users,email',
            'phone'                 => 'required|string|max:20',
            'password'              => ['required', 'confirmed', PasswordRule::min(8)],
        ]);

        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $user = User::create([
            'name'            => $data['name'],
            'email'           => $data['email'],
            'phone'           => $data['phone'],
            'password'        => $data['password'],
            'otp'             => $otp,
            'otp_expires_at'  => now()->addMinutes(10),
        ]);

        // Send OTP email
        Mail::raw("Your WorkWorm verification OTP is: {$otp}. It expires in 10 minutes.", function ($msg) use ($user) {
            $msg->to($user->email)->subject('Verify your WorkWorm account');
        });

        return response()->json([
            'success' => true,
            'message' => 'OTP sent to your email. Please verify your account.',
        ], 201);
    }

    /**
     * Verify OTP after registration.
     */
    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp'   => 'required|string|size:6',
        ]);

        $user = User::where('email', $data['email'])->firstOrFail();

        if ($user->otp !== $data['otp'] || now()->isAfter($user->otp_expires_at)) {
            return response()->json(['success' => false, 'message' => 'Invalid or expired OTP.'], 422);
        }

        $user->update([
            'email_verified_at' => now(),
            'otp'               => null,
            'otp_expires_at'    => null,
        ]);

        return response()->json(['success' => true, 'message' => 'Email verified successfully.']);
    }

    /**
     * Login customer.
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['success' => false, 'message' => 'Invalid email or password.'], 401);
        }

        if (! $user->email_verified_at) {
            return response()->json(['success' => false, 'message' => 'Please verify your email before logging in.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data'    => compact('token', 'user'),
        ]);
    }

    /**
     * Get authenticated user.
     */
    public function me(Request $request)
    {
        return response()->json(['success' => true, 'data' => $request->user()]);
    }

    /**
     * Logout.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Logged out.']);
    }

    /**
     * Send password reset link.
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $status = Password::sendResetLink($request->only('email'));

        if ($status !== Password::RESET_LINK_SENT) {
            return response()->json(['success' => false, 'message' => __($status)], 400);
        }

        return response()->json(['success' => true, 'message' => 'Password reset link sent.']);
    }

    /**
     * Reset password.
     */
    public function resetPassword(Request $request)
    {
        $data = $request->validate([
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => ['required', 'confirmed', PasswordRule::min(8)],
        ]);

        $status = Password::reset($data, function (User $user, string $password) {
            $user->forceFill(['password' => $password])->save();
            $user->tokens()->delete();
        });

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json(['success' => false, 'message' => __($status)], 422);
        }

        return response()->json(['success' => true, 'message' => 'Password reset successfully.']);
    }
}
