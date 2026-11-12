<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\PricingPlanController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::resource('pricing-plans', PricingPlanController::class)->except(['show']);

        Route::resource('testimonials', TestimonialController::class)->except(['show']);
        Route::patch('testimonials/{testimonial}/toggle-active', [TestimonialController::class, 'toggleActive'])
            ->name('testimonials.toggle-active');

        Route::resource('faqs', FaqController::class)->except(['show']);
        Route::patch('faqs/{faq}/toggle-active', [FaqController::class, 'toggleActive'])
            ->name('faqs.toggle-active');

        Route::get('settings', [SiteSettingController::class, 'index'])->name('settings.index');
        Route::put('settings', [SiteSettingController::class, 'update'])->name('settings.update');
    });
});

require __DIR__.'/settings.php';
