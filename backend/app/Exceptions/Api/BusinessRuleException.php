<?php

namespace App\Exceptions\Api;

class BusinessRuleException extends ApiException
{
    public function __construct(
        string $errorCode,
        string $message,
        array $errors = []
    ) {
        parent::__construct(
            $errorCode,
            $message,
            422,
            $errors
        );
    }
}