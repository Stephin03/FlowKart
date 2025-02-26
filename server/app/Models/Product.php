<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'userId',
        'productName',
        'productCategory',
        'productPrice', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
