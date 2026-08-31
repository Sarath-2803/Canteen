import { asyncHandler } from './errorHandler.js';
import { ForbiddenError } from '../utils/errors.js';
const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        throw new ForbiddenError('Access denied: Admins only');
    }
    next();
});
export default isAdmin;
//# sourceMappingURL=isAdmin.js.map