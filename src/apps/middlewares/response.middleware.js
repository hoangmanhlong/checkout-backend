export function responseMiddleware(req, res, next) {
    res.success = function (data = {}, status = 200) {
        return res.status(status).json({
            success: true,
            data,
        });
    };

    res.error = function (message = 'Bad request', status = 400) {
        return res.status(status).json({
            success: false,
            message,
        });
    };

    next();
}
