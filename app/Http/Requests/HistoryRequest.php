<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;
use App\Models\Shop;

class HistoryRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the post request.
     *
     * @return array
     */
    public function store()
    {
        return [
            'userID' => 'required|max:120|exists:users,id',
            'score' => 'required|max:250',
        ];
    }

}
