import { lightdashConfig } from './config/lightdashConfig';
import database from './database/database';
import Logger from './logging/logger';
import { UserModel } from './models/UserModel';

(async function init() {
    Logger.warn(`Override user password`);
    const email: string | undefined = process.argv[2];
    const newPassword: string | undefined = process.argv[3];

    if (!email) {
        throw new Error('Email is undefined');
    }

    if (!newPassword) {
        throw new Error('New password is undefined');
    }

    const userModel = new UserModel({ database, lightdashConfig });

    Logger.info(`Get user by email: ${email}`);
    const user = await userModel.findSessionUserByPrimaryEmail(email);
    Logger.info(`Update user (${user.userId}) password`);
    await userModel.updatePassword(user.userId, newPassword);
    Logger.info(`Successfully updated user (${user.userId}) password`);
    process.exit();
})();
