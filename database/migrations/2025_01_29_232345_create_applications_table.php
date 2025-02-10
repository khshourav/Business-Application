<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->after('id')->unique();
            $table->unique('application_number');
            $table->enum('state', [
                'submitted', 
                'under_review', 
                'additional_info_required', 
                'approved', 
                'rejected'
            ])->default('submitted');
            
            // Applicant Information
            $table->string('company_name');
            $table->string('tin_bin_vat_gst');
            
            // Factory Information
            $table->string('factory_name');
            $table->text('factory_address');
            $table->string('city');
            $table->string('postal_code');
            $table->string('country');
            
            // Contact Information
            $table->string('contact_person');
            $table->string('contact_number');
            $table->string('email');
            
            // Management Info
            $table->string('management_representative');
            $table->string('consultant')->nullable();
            
            // Employees
            $table->integer('employees_male');
            $table->integer('employees_female');
            $table->integer('employees_total');
            
            // Production Info
            $table->string('factory_function')->nullable();
            $table->text('production_processes')->nullable();
            $table->string('product_category')->nullable();
            
            // Audit Info
            $table->string('smeta')->nullable();
            $table->string('audit_type');
            $table->string('slcp')->nullable();
            $table->string('verification_notification_method');
            $table->string('sac_higg_fem_verification')->nullable();
            $table->string('iso_management_system_certification')->nullable();
            
            // Additional Info
            $table->text('outsource_process')->nullable();
            $table->text('resources')->nullable();
            $table->string('brand_customer_name')->nullable();
            
            // Certifications
            $table->json('certifications')->nullable();
            $table->string('other_certifications')->nullable();
            
            // Authorization
            $table->date('date');
            $table->string('authorizing_name');
            $table->string('title');
            $table->string('signature_file_path')->nullable();
            $table->string('signature_name');
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('applications');
    }
}