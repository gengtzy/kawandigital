<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\PricingPlan;
use App\Models\Project;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'projects' => Project::query()
                ->featured()
                ->ordered()
                ->get([
                    'id',
                    'title',
                    'slug',
                    'client_name',
                    'category',
                    'year',
                    'thumbnail_path',
                    'bg_theme',
                    'live_url',
                ]),
            'pricingPlans' => PricingPlan::query()
                ->ordered()
                ->get([
                    'id',
                    'name',
                    'price_label',
                    'billing_note',
                    'description',
                    'features',
                    'is_highlighted',
                    'cta_text',
                    'whatsapp_message',
                ]),
            'testimonials' => Testimonial::query()
                ->active()
                ->ordered()
                ->get([
                    'id',
                    'client_name',
                    'business_name',
                    'quote',
                    'rating',
                    'avatar_path',
                    'card_type',
                ]),
            'faqs' => Faq::query()
                ->active()
                ->ordered()
                ->get([
                    'id',
                    'question',
                    'answer',
                ]),
        ]);
    }
}

