<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
        //Contains all inputs with validations
        return [
            "address" => "required",
            "phone" => 'required|regex:/^01[0125][0-9]{8}$/',
            "city_id" => "required",
            "area_id" => "required",
        ];
    }
}
