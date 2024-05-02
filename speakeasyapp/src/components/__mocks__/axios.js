module.exports = {
    get: jest.fn((url) => {
        if (url === '/something') {
            return Promise.resolve({
                data: 'data'
            });
        }
    }),
    post: jest.fn((url) => {
        if (url === '/something') {
            return Promise.resolve({
                data: 'data'
            });
        }
        if (url === '/something2') {
            return Promise.resolve({
                data: 'data2'
            });
        }
    }),
    create: jest.fn(function () {
        return this;
    })
};