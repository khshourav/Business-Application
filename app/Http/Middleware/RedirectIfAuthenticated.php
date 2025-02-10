<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // Add admin check here
                if (Auth::user()->is_admin) {
                    return redirect()->route('admin.dashboard');
                }
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
}