<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $projectId = $this->route('project')?->id;

        return [
            'title' => ['required', 'string', 'max:160'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                Rule::unique('projects', 'slug')->ignore($projectId),
            ],
            'client_name' => ['required', 'string', 'max:160'],
            'category' => ['required', 'string', 'max:100'],
            'year' => ['required', 'string', 'max:20'],
            'bg_theme' => ['required', Rule::in(['blue', 'dark', 'light'])],
            'live_url' => ['nullable', 'url', 'max:255'],
            'is_featured' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'remove_thumbnail' => ['nullable', 'boolean'],
        ];
    }
}

