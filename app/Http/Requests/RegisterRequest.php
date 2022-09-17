<?php

namespace App\Http\Requests;

use App\Constants\ClientType;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "store_name" => "required",
            "email" => "required|email|unique:users",
            "phone" => "required|regex:/^01[0125][0-9]{8}$/|unique:users",
            "password" => "required",
            "city_id" => "required|numeric|exists:cities,id",
            "area_id" => "required|numeric|exists:areas,id",
            "address" => "required",
            "type" => "required|in:" . ClientType::ALL,
        ];
    }
}
