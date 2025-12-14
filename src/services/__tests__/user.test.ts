import { TUser } from '@utils-types';
import reducer, { initialState } from '../slices/user';
import {
  checkUserAuth,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '@thunks';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'TestUser'
};

const mockAuthResponse = {
  user: mockUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

describe('[userSlice]', () => {
  it('неизвестный action -> initialState', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('registerUser', () => {
    it('pending: isLoading = true', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginError).toBeNull();
    });

    it('fulfilled: пользователь авторизован', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockAuthResponse);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser', () => {
    it('pending: isLoading = true', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginError).toBeNull();
    });

    it('fulfilled: пользователь авторизован', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = reducer(initialState, action);

      expect(state.loginError).toBeNull();
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockAuthResponse);
    });
  });

  describe('getUser', () => {
    it('fulfilled: пользователь загружен', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual({ user: mockAuthResponse.user });
      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected: пользователь не авторизован, isAuthChecked = true', () => {
      const action = { type: getUser.rejected.type };
      const state = reducer(initialState, action);

      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('fulfilled: обновляет данные пользователя', () => {
      const updatedUser = { ...mockUser, name: 'New Name' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const initial = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      };
      const state = reducer(initial, action);

      expect(state.user).toEqual({
        user: {
          ...mockAuthResponse.user,
          name: 'New Name'
        }
      });
    });
  });

  describe('logoutUser', () => {
    it('fulfilled: пользователь выходит', () => {
      const action = { type: logoutUser.fulfilled.type };
      const filledState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
        isAuthChecked: true
      };
      const state = reducer(filledState, action);

      expect(state.user).toBeNull();
    });
  });

  describe('checkUserAuth', () => {
    it('fulfilled', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected', () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
    });
  });
});
