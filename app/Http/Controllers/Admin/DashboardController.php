<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\PricingPlan;
use App\Models\Project;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'projects_count' => Project::query()->count(),
                'featured_projects_count' => Project::query()->featured()->count(),
                'pricing_plans_count' => PricingPlan::query()->count(),
                'active_testimonials_count' => Testimonial::query()->active()->count(),
                'total_testimonials_count' => Testimonial::query()->count(),
                'active_faqs_count' => Faq::query()->active()->count(),
                'total_faqs_count' => Faq::query()->count(),
            ],
        ]);
    }
}

