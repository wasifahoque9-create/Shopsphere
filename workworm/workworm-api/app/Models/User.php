<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'phone', 'gender', 'address',
        'password', 'otp', 'otp_expires_at', 'email_verified_at',
        'avatar',
    ];

    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }
        // Default avatar
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=121358&background=e0e7ff';
    }

    protected $hidden = ['password', 'remember_token', 'otp'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'otp_expires_at'    => 'datetime',
        'password'          => 'hashed',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
