<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function getProduct(Request $request)
    {

        $limit = $request->query('limit', 5);


        $userId = $request->attributes->get('userId');

        $products = Product::where('userId', $userId)->orderBy('created_at', 'desc')->paginate($limit);
    
        return response()->json($products, 200);

    }


    

    public function addProduct(Request $request)
    {

        $request->validate([
            'productName' => 'required|string|max:255',
            'productCategory' => 'required|string|max:255',
            'productPrice' => 'required|numeric',
        ]);

        

        $userId = $request->attributes->get('userId');

        $product = Product::create([
            'userId'=>$userId,
            'productName' => $request->productName,
            'productCategory' => $request->productCategory,
            'productPrice' => $request->productPrice,
        ]);
        
        // \Log::info("Returning response", ['product' => $product]);
        
        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product
        ], 201);
        
    }

    public function editProduct(Request $request, $id)
    {
        $request->validate([
            'productName' => 'sometimes|required|string|max:255',
            'productCategory' => 'sometimes|required|string|max:255',
            'productPrice' => 'sometimes|required|numeric',
        ]);
    
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $userId = $request->attributes->get('userId');

        if(!($userId == $product->userId))
        {
            return response()->json(['message' => 'user id miss matched'], 403);
        }
    
        // Update only the fields that are present in the request
        $product->update($request->only(['productName', 'productCategory', 'productPrice']));
    
        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product
        ], 200);
    }


    public function deleteProduct($id)
    {
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        $product->delete();
    
        return response()->json(['message' => 'Product deleted successfully!'], 200);
    }

}
