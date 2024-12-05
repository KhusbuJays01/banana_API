<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Http\Resources\HistoryResource;
use App\Models\History;
use App\Http\Requests\HistoryRequest;
use Illuminate\Http\Request;

class HistoryController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $id = $request->input("userID");
        $data = History::where("userID", $id)->paginate(30);
        $message = "History retrieved successfully";
        return $this->sendResponse(HistoryResource::collection($data), $message);
    }

    /**
     * Get the user history for particular user id.
     *
     * @param  \App\Models\History  $History
     * @return \Illuminate\Http\JsonResponse
     */
    public function user_history(Request $request)
    {
        $id = $request->input("userID");
        $data = History::where("userID", $id)->paginate(30);
        $message = "History retrieved successfully";
        return $this->sendResponse(HistoryResource::collection($data), $message);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(HistoryRequest $request)
    {
        $obj = History::create($request->all());
        $message = 'History created successfully';

        return $this->sendResponse(new HistoryResource($obj), $message);
    }

    /**
     * Display the user history information.
     *
     * @param  \App\Models\History  $History
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        $data = History::where("userID", $id)->paginate(30);
        $message = "History retrieved successfully";
        return $this->sendResponse(HistoryResource::collection($data), $message);

    }

    /**
     * Get the highest for particular user.
     *
     * @param  \App\Models\History  $History
     * @return \Illuminate\Http\JsonResponse
     */
    public function get_highest($userID)
    {
        // $id = $request->input("userID");
        $data = History::where("userID", $userID)->max('score');
        $message = "History retrieved successfully";
        return $this->sendResponse(['highest_score' => $data], $message);
    }

}
