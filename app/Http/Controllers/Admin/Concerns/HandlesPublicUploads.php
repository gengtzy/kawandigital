<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HandlesPublicUploads
{
    /**
     * Store an uploaded image, delete an old file when replaced or cleared, and return the resulting relative path.
     */
    protected function syncPublicImage(
        Request $request,
        string $fileField,
        string $directory,
        ?string $existingPath,
        string $removeField,
    ): ?string {
        if ($request->hasFile($fileField)) {
            $this->deletePublicImage($existingPath);

            return $request->file($fileField)->store($directory, 'public');
        }

        if ($request->boolean($removeField)) {
            $this->deletePublicImage($existingPath);

            return null;
        }

        return $existingPath;
    }

    protected function deletePublicImage(?string $path): void
    {
        if ($path !== null && $path !== '') {
            Storage::disk('public')->delete($path);
        }
    }
}

