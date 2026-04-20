<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$jnf = \App\Models\Jnf::find(3);
if ($jnf) {
    if ($jnf->selectionRounds()->count() === 0) {
        $jnf->selectionRounds()->create([
            'round_order' => 1,
            'round_name' => 'Resume Shortlisting',
            'round_category' => 'resume_shortlisting',
            'selection_mode' => 'online',
            'duration_minutes' => 60,
            'other_screening_notes' => "Scheduled at: 2026-05-10T10:00\nPlease bring a printed copy.",
        ]);
        $jnf->selectionRounds()->create([
            'round_order' => 2,
            'round_name' => 'Technical Interview',
            'round_category' => 'technical_interview',
            'selection_mode' => 'online',
            'interview_mode' => 'video_conferencing',
            'duration_minutes' => 45,
            'team_members_required' => 2,
            'other_screening_notes' => "Scheduled at: 2026-05-12T14:00\nPlatform: Google Meet.",
        ]);
        echo "Successfully injected mock selection rounds for JNF 3.\n";
    }
}
