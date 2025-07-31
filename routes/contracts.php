<?php

use App\Http\Controllers\ContractController;
use Illuminate\Support\Facades\Route;

Route::prefix('contract')->middleware('auth')->group(function () {

    /* Página de pagamento (GET)  /contract/payment/{contract}   */
    Route::get('/payment/{contract}', [ContractController::class, 'payment'])
        ->name('contract.payment');

    /* Confirmação de pagamento (POST)  /contract/payment/{contract}  */
    Route::post('/payment/{contract}', [ContractController::class, 'pay'])
        ->name('contract.pay');

    /* Sucesso após pagamento        /contract/success            */
    Route::get('/success', [ContractController::class, 'success'])
        ->name('contract.success');
});
