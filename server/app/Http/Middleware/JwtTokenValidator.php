<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Log;
use App\Models\User;






class JwtTokenValidator
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token is missing'], 401);
        }


        try {
            // Decode the JWT token
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            $userId = $decoded->sub;


            //  updated validate added for the userID

            if (!$userId) {
                return response()->json(['message' => 'Unable to verify user'], 401);
            }

            // Validate that the user exists in the database
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $request->attributes->add(['userId' => $userId]);

        } catch (\Exception $e) {
            // Invalid token or expired
            return response()->json(['message' => 'Invalid or expired token', 'error' => $e->getMessage()], 401);
        }

        return $next($request);
    }
}