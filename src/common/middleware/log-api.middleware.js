export const logAPI = (req, res, next) => {
    console.log(`[API CALL] ${req.method} - ${req.url}`);
    next();
}