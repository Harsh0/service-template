describe('UserService', () => {
    let UserService;
    let mockUserEntity;
    beforeAll(() => {
        jest.mock(
            '../config',
            jest.fn(() => ({
                JWT_SECRET: 'sssshhhh',
                ACCESS_TOKEN_VALIDITY_SECONDS: 1800,
            }))
        );
        jest.mock(
            '../entities',
            jest.fn(() => ({
                User: mockUserEntity,
            }))
        );
        mockUserEntity = jest.fn().mockImplementation(() => ({
            save: jest.fn(),
        }));
        mockUserEntity.findOne = jest.fn();
        UserService = require('./UserService').default;
    });

    afterEach(() => {
        jest.resetModules();
    });

    describe('signup when no user exist', () => {
        beforeEach(() => {
            UserService.generateNewAuth = jest.fn(() => ({
                accessToken: 'accessToken',
                refreshToken: 'refreshToken',
            }));
        });
        it('should return valid token response for new user', async () => {
            jest.spyOn(mockUserEntity, 'findOne');
            const tokenResponse = await UserService.signup('test', 'test');
            expect(tokenResponse.accessToken).toEqual('accessToken');
            expect(tokenResponse.refreshToken).toEqual('refreshToken');
            expect(mockUserEntity.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('signup when user already exist', () => {
        beforeEach(() => {
            mockUserEntity.findOne = jest.fn(() => ({}));
        });
        it('should throw error when user already exist', async () => {
            await expect(UserService.signup('test', 'test')).rejects.toEqual(
                new Error('User already exist')
            );
        });
    });
});
