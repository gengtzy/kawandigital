<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesPublicUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    use HandlesPublicUploads;

    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()->ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => null,
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Project::query()->create([
            'title' => $validated['title'],
            'slug' => $this->generateUniqueSlug($validated['slug'] ?: $validated['title']),
            'client_name' => $validated['client_name'],
            'category' => $validated['category'],
            'year' => $validated['year'],
            'bg_theme' => $validated['bg_theme'],
            'live_url' => $validated['live_url'] ?: null,
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => (int) $validated['sort_order'],
            'thumbnail_path' => $this->syncPublicImage($request, 'thumbnail', 'projects', null, 'remove_thumbnail'),
        ]);

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Portofolio berhasil ditambahkan.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project,
        ]);
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $validated = $request->validated();

        $project->update([
            'title' => $validated['title'],
            'slug' => $this->generateUniqueSlug($validated['slug'] ?: $validated['title'], $project->id),
            'client_name' => $validated['client_name'],
            'category' => $validated['category'],
            'year' => $validated['year'],
            'bg_theme' => $validated['bg_theme'],
            'live_url' => $validated['live_url'] ?: null,
            'is_featured' => $request->boolean('is_featured'),
            'sort_order' => (int) $validated['sort_order'],
            'thumbnail_path' => $this->syncPublicImage(
                $request,
                'thumbnail',
                'projects',
                $project->thumbnail_path,
                'remove_thumbnail',
            ),
        ]);

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Portofolio berhasil diperbarui.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->deletePublicImage($project->thumbnail_path);
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Portofolio berhasil dihapus.');
    }

    private function generateUniqueSlug(string $source, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($source);

        if ($baseSlug === '') {
            $baseSlug = 'project';
        }

        $candidate = $baseSlug;
        $counter = 2;

        while (
            Project::query()
                ->where('slug', $candidate)
                ->when($ignoreId !== null, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $baseSlug.'-'.$counter;
            $counter++;
        }

        return $candidate;
    }
}

