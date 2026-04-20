<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Programme;
use App\Models\Discipline;
use App\Models\Department;

class MasterRecordSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedProgrammes();
        $this->seedDisciplines();
        $this->seedDepartments();
    }

    private function parseCsv($text, $hasQuotes = true) {
        $lines = explode("\n", trim($text));
        $header = str_getcsv(array_shift($lines));
        $data = [];
        foreach ($lines as $line) {
            if (!trim($line)) continue;
            $row = str_getcsv(trim($line));
            $data[] = array_combine($header, $row);
        }
        return $data;
    }

    private function determineLevel($name) {
        $name = strtolower($name);
        if (str_contains($name, 'bachelor') || str_contains($name, 'b.tech') || str_contains($name, 'undergraduate')) return 'ug';
        if (str_contains($name, 'master') || str_contains($name, 'm.tech') || str_contains($name, 'mba') || str_contains($name, 'postgrad')) return 'pg';
        if (str_contains($name, 'doctor') || str_contains($name, 'ph.d') || str_contains($name, 'jrf')) return 'doctoral';
        return 'other';
    }

    private function seedProgrammes() {
        $csv = <<<CSV
"id","name","duration","status","wef","wet"
"b.tech","Bachelor of Technology","4","1","2019-2020","2019-2020"
"be","Bachelor of Engineering","4","1","2019-2020","2019-2020"
"comm","Common Course for 1st Year","1","1","2019-2020","2019-2020"
"dualdegree","Dual Degree","5","1","2019-2020","2019-2020"
"execmba","Executive Master of Business Administration","3","1","2019-2020","2019-2020"
"3yrmtech","Master of Technology (3 Years)","3","1","2019-2020","2019-2020"
"honour","Honours Course","2","1","2019-2020","2019-2020"
"int.m.sc","Integrated Master of Science","5","1","2019-2020","2019-2020"
"int.m.tech","Integrated Master of Technology","5","1","2019-2020","2019-2020"
"int.msc.tech","Integrated Master of Science and Technology","5","1","2019-2020","2019-2020"
"m.phil","Master of Philosophy","1","1","2019-2020","2019-2020"
"m.sc","Master of Science","2","1","2019-2020","2019-2020"
"m.sc.tech","Master of Science and Technology","3","1","2019-2020","2019-2020"
"m.tech","Master of Technology","2","1","2019-2020","2019-2020"
"mba","Master of Business Administration","2","1","2019-2020","2019-2020"
"minor","Minor Course","2","1","2019-2020","2019-2020"
"prep","Preparatory","1","1","2019-2020","2019-2020"
"jrf","Doctor of Philosophy","7","1","2019-2020","2019-2020"
"online","Online","1","1","2019-2020","2019-2020"
"mbaba","Master of Business Administration (BA)","2","1","2020-2021","2020-2021"
"dualdegree_categoryA","Dual Degree (Category A)","3","1","2021-2022","2021-2022"
"dualdegree_categoryB","Dual Degree (Category B)","3","1","2021-2022","2021-2022"
"dualdegree_categoryC","Dual Degree (Category C)","3","1","2021-2022","2021-2022"
"doublemajor","Double Major","2","1","2021-2022","2021-2022"
"PH.D","Doctor of Philosophy","7","0","2019-2020","2019-2020"
"MBA BA","Master of Business Administration","2","0","2020-2021","2020-2021"
"ma","Master of Arts","2","1","2023-2024","2023-2024"
"pgd","PG Diploma","2","1","2023-2024","2023-2024"
"2execmtech","Executive Master of Technology (2 Years)","2","1","2024-2025","2024-2025"
"3execmtech","Executive Master of Technology (3 Years)","3","1","2024-2025","2024-2025"
"mixed","Mixed","2","1","2024-2025","2024-2025"
"dualdegree_categoryC1","Dual Degree (Category C1)","4","1","2024-2025","2024-2025"
"dualdegree_categoryC2","Dual Degree (Category C2)","4","1","2024-2025","2024-2025"
"dualdegree_categoryD","Dual Degree (Category D)","4","1","2024-2025","2024-2025"
"int.bsms","Integrated Bachelor of Science and Master of Science","5","1","2025-2026","2025-2026"
"dd.b.tech","Dual Degree B.Tech With MBA","5","1","2025-2026","2025-2026"
"Special","Special","1","1","2025-2026","2025-2026"
CSV;
        $items = $this->parseCsv($csv);
        foreach ($items as $item) {
            // Check if name already exists to avoid duplicates
            $exists = Programme::where('name', $item['name'])->first();
            if ($exists) continue;

            Programme::create(
                [
                    'code' => $item['id'],
                    'name' => $item['name'],
                    'duration_years' => $item['duration'],
                    'is_active' => (bool) $item['status'],
                    'level' => $this->determineLevel($item['name'])
                ]
            );
        }
    }

    private function seedDisciplines() {
        $csv = <<<CSV
"id","name","status","wef","wet"
"agl","Applied Geology","1","2019-2020","2019-2020"
"agp","Applied Geophysics","1","2019-2020","2019-2020"
"phy","Physics","1","2019-2020","2019-2020"
"chem","Chemistry","1","2019-2020","2019-2020"
"civ","Civil Engineering","1","2019-2020","2019-2020"
"comm","Common Branch for 1st Year","1","2019-2020","2019-2020"
"cse","Computer Science and Engineering","1","2019-2020","2019-2020"
"cse+cse","Computer Science and Engineering+Computer Science and Engineering","1","2019-2020","2019-2020"
"cseis","Computer Science and Engineering with Spl. in Information Security","0","2019-2020","2019-2020"
"ece","Electronics and Communication Engineering","1","2019-2020","2019-2020"
"ee","Electrical Engineering","1","2019-2020","2019-2020"
"eg","Engineering Geology","1","2019-2020","2019-2020"
"env","Environmental Engineering","1","2019-2020","2019-2020"
"ep","Engineering Physics","1","2019-2020","2019-2020"
"eqse","Earthquake Science & Engineering","1","2019-2020","2019-2020"
"ese","Environmental Science and Engineering","1","2019-2020","2019-2020"
"fe","Fuel Engineering","1","2019-2020","2019-2020"
"geo","Geomatics","1","2019-2020","2019-2020"
"gte","Geotechnical Engineering","1","2019-2020","2019-2020"
"iem","Industrial Engineering and Management","1","2019-2020","2019-2020"
"m&c","Mathematics and Computing","1","2019-2020","2019-2020"
"mba","Master of Business Administration","1","2019-2020","2019-2020"
"me","Mining Engineering","1","2019-2020","2019-2020"
"mech","Mechanical Engineering","1","2019-2020","2019-2020"
"mech+mfg","Mechanical Engg. (Spl: Manufacturing Engineering)","1","2019-2020","2019-2020"
"mech+te","Mechanical Engg. (Spl: Thermal Engineering)","1","2019-2020","2019-2020"
"mee","Mechanical Engg (Spl: Machine Design)","1","2019-2020","2019-2020"
"met","Mechanical Engg. (Spl: Maintenance Engineering and Tribology)","1","2019-2020","2019-2020"
"mexp","Mineral Exploration","1","2019-2020","2019-2020"
"mineee","Mine Electrical Engineering","1","2019-2020","2019-2020"
"mle","Mineral Engineering","1","2019-2020","2019-2020"
"mme","Mining Machinery Engineering","1","2019-2020","2019-2020"
"ocm","Opencast Mining","1","2019-2020","2019-2020"
"ooce","Optoelectronics and Optical Communication Engineering","1","2019-2020","2019-2020"
"pe","Petroleum Engineering","1","2019-2020","2019-2020"
"peed","Power Electronics and Electrical Drives","1","2019-2020","2019-2020"
"pexp","Petroleum Exploration","1","2019-2020","2019-2020"
"phd","Doctor of Philosophy","1","2019-2020","2019-2020"
"prep","Preparatory","1","2019-2020","2019-2020"
"pse","Power System Engineering","1","2019-2020","2019-2020"
"jrf","Junior Research Fellow","1","2019-2020","2019-2020"
"rfme","RF & Microwave Engineering","1","2019-2020","2019-2020"
"se","Structural Engineering","1","2019-2020","2019-2020"
"tust","Tunnelling and Underground Space Technology","1","2019-2020","2019-2020"
"vlsid","VLSI Design","1","2019-2020","2019-2020"
"da","Data Analytics","1","2019-2020","2019-2020"
"gexp","Geo-Exploration","1","2019-2020","2019-2020"
"ce","Chemical Engineering","1","2019-2020","2019-2020"
"hss","Humanities & Social Sciences","1","2019-2020","2019-2020"
"es","Environmental Science","1","2019-2020","2019-2020"
"eng","English","1","2019-2020","2019-2020"
"math","Mathematics","1","2019-2020","2019-2020"
"stat","Statistics","1","2019-2020","2019-2020"
"mgmt","Management","1","2019-2020","2019-2020"
"csp","Communication and Signal Processing","1","2019-2020","2019-2020"
"me+me","Mining Engineering+Mining Engineering","1","2019-2020","2019-2020"
"ei","Electronics and Instrumentation Engineering","1","2019-2020","2019-2020"
"om","Operation Management","1","2019-2020","2019-2020"
"fm","Financial Management","1","2019-2020","2019-2020"
"mle+mle","Mineral Engineering+Mineral Engineering","1","2019-2020","2019-2020"
"emba","Executive Master of Business Administration","1","2019-2020","2019-2020"
"min","Mining Engineering","0","2019-2020","2019-2020"
"online","Online","1","2019-2020","2019-2020"
"ba","Business Analytics","1","2020-2021","2020-2021"
"phse","Pharmaceutical Science & Engineering","1","2020-2021","2020-2021"
"philo","Philosophy","1","2020-2021","2020-2021"
"mlmte","Minerals and Metallurgical Engineering","1","2020-2021","2020-2021"
"fmme","Fuel, Minerals and Metallurgical Engineering","1","2021-2022","2021-2022"
"smc","Social Media and Culture","1","2021-2022","2021-2022"
"psycho","Psychology","1","2021-2022","2021-2022"
"soci","Sociology","1","2022-2023","2022-2023"
"dhss","Digital Humanities and Social Sciences","1","2023-2024","2023-2024"
"mte","Metallurgical Engineering","1","2024-2025","2024-2025"
"fee","Fuel & Energy Engineering","1","2024-2025","2024-2025"
"ocip","Optical Communication & Integrated Photonics","1","2024-2025","2024-2025"
"eai","Artificial Intelligence & Data Science","1","2024-2025","2024-2025"
"cwr","Water Resources Engineering","1","2025-2026","2025-2026"
"twr","Transportation Engineering","1","2025-2026","2025-2026"
"memba","Mining engineering & MBA","1","2025-2026","2025-2026"
"physc","Physical Science","1","2025-2026","2025-2026"
"chesc","Chemical Science","1","2025-2026","2025-2026"
"eme","Mechanical Engineering","1","2025-2026","2025-2026"
"epe","Petroleum Engineering","1","2025-2026","2025-2026"
CSV;
        $items = $this->parseCsv($csv);
        foreach ($items as $item) {
            $exists = Discipline::where('name', $item['name'])->first();
            if ($exists) continue;

            Discipline::create(
                [
                    'short_name' => $item['id'],
                    'name' => $item['name'],
                    'is_active' => (bool) $item['status']
                ]
            );
        }
    }

    private function seedDepartments() {
        $csv = <<<CSV
id,name,type,status,wef,wet
ac,Applied Chemistry (Not in use),academic,0,2019-2020,2019-2020
agl,Applied Geology,academic,1,2019-2020,2019-2020
agp,Applied Geophysics,academic,1,2019-2020,2019-2020
am,Applied Mathematics (Not in use),academic,0,2019-2020,2019-2020
ap,Applied Physics (Not in use),academic,0,2019-2020,2019-2020
ccb,Chemistry and Chemical Biology,academic,1,2021-2022,2021-2022
ce,Chemical Engineering,academic,1,2019-2020,2019-2020
chem,Chemistry (Not in use),academic,0,2019-2020,2019-2020
ciie,Centre for Innovation Incubation and Entrepreneurship,academic,1,2019-2020,2019-2020
comm,Common,academic,1,2019-2020,2019-2020
cse,Computer Science and Engineering,academic,1,2019-2020,2019-2020
cve,Civil Engineering,academic,1,2019-2020,2019-2020
ece,Electronics Engineering,academic,1,2019-2020,2019-2020
ee,Electrical Engineering,academic,1,2019-2020,2019-2020
ese,Environmental Science & Engineering,academic,1,2019-2020,2019-2020
fme,"Fuel, Minerals and Metallurgical Engineering",academic,1,2019-2020,2019-2020
hss,Humanities and Social Sciences,academic,1,2019-2020,2019-2020
mc,Mathematics and Computing,academic,1,2019-2020,2019-2020
me,Mining Engineering,academic,1,2019-2020,2019-2020
mech,Mechanical Engineering,academic,1,2019-2020,2019-2020
mme,Mining Machinery Engineering (Not in use),academic,0,2019-2020,2019-2020
ms,Management Studies (Not in use),academic,0,2019-2020,2021-2022
msie,Management Studies and Industrial Engineering,academic,1,2022-2023,2022-2023
nvcti,Naresh Vashisht Centre for Tinkering and Innovation,academic,1,2019-2020,2019-2020
pe,Petroleum Engineering,academic,1,2019-2020,2019-2020
phy,Physics,academic,1,2019-2020,2019-2020
prep,Preparatory,academic,1,2019-2020,2019-2020
spec,Sports and Physical Education Centre,academic,1,2019-2020,2019-2020
ss,Sports Section,academic,1,2019-2020,2019-2020
CSV;
        $items = $this->parseCsv($csv, false);
        foreach ($items as $item) {
            $exists = Department::where('name', $item['name'])->first();
            if ($exists) continue;

            Department::create(
                [
                    'code' => $item['id'],
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'is_active' => (bool) $item['status']
                ]
            );
        }
    }
}
