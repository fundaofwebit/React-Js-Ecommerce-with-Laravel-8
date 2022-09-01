<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check())
        {
            if(auth()->user()->tokenCan('server:admin'))
            {
                return $next($request);
            }
            else
            {
                return response()->json([
                    'message'=>'Access Denied.! As you are not an Admin.',
                ], 403);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Please Login First.',
            ]);
        }
    }
}
