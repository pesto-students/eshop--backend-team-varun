

const statusCode = (  statusCode,  res, ...param1)=>{

    // param1[1]="check ";
    if(param1[1]){
        res.status(statusCode).json({
            success:true,
            product: param1[0],
            productCount:param1[1],
        });

    }else {
    res.status(statusCode).json({
        success:true,
        product: param1[0],
    });
}
};

module.exports = statusCode;