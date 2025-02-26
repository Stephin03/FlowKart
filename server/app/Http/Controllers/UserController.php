<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

   
    
    public function register(Request $request)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|digits:10|unique:users,phone',
            'code' => 'required|digits:4', // Ensure it's exactly 4 digits
        ]);



        $hashedCode = Hash::make($validatedData['code']);

        // Create new user
        $user = User::create([
            'name' => $validatedData['name'],
            'phone' => $validatedData['phone'],
            'code' => $hashedCode,
        ]);

        // Return success response
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user
        ], 201);
    }


    public function login(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'phone' => 'required|digits:10',
            'code' => 'required|digits:4',
        ]);

        // Find user by phone number
        $user = User::where('phone', $validatedData['phone'])->first();

        // Check if user exists and verify the code
        if (!$user || !Hash::check($validatedData['code'], $user->code)) {
            return response()->json([
                'message' => 'Invalid phone number or code.'
            ], 400);
        }

        // Generate JWT token
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 3) // Token expires in 3 hour
        ];

        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        // Authentication successful
        return response()->json([
            'message' => 'Login successful!',
            'token' => $token,
            'user' => $user
        ], 200);
    }


    public function currentUser (Request $request){
        $userId = $request->attributes->get('userId');
        $user = User::find($userId);

        return response()->json([
            'user' => $user,           
            'message' => 'Authorized !!'
        ], 200);

    }
}



