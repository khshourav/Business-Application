<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'csrfToken' => csrf_token(),
        
        'errors' => fn () => $request->session()->get('errors') 
            ? $request->session()->get('errors')->getBag('default')->getMessages()
            : [],
            
        'auth' => [
            'user' => $request->user() ?: null,
        ],
        
        'flash' => [
            'success'    => fn () => $request->session()->get('success'),
            'error'      => fn () => $request->session()->get('error'),
            'warning'    => fn () => $request->session()->get('warning'),
            'info'       => fn () => $request->session()->get('info'),
            'status'     => fn () => $request->session()->get('status'),
            'certificate'=> fn () => $request->session()->get('certificate'),
            'message'    => fn () => $request->session()->get('message')
        ],
        
        'ziggy' => fn () => array_merge(
            (new \Tighten\Ziggy\Ziggy)->toArray(),
            ['location' => $request->url()]
        )
    ]);
}
}
