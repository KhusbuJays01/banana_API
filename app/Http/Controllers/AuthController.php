<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response([
                'errors' => ['Authentication'=>['The email or password does not match']]
            ], 422);
        }
        $user = Auth::user(); 
        $user->outlet;
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success'=> true
        ]);
    }
}
