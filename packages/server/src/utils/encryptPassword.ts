import { getConnection } from "typeorm";

export const encryptPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        getConnection("member")
            .query(
                "SELECT UPPER(SUBSTRING(sys.fn_VarBinToHexStr(HASHBYTES('MD5', CAST(@0 AS VarChar(12)))),3,32)) AS EncryptedPassword",
                [password]
            )
            .then((result) => {
                resolve(result[0].EncryptedPassword);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
