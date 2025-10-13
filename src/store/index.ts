import { create } from 'zustand';
import { devtools, persist, type PersistStorage } from 'zustand/middleware';
import Cookie from 'js-cookie'; //we cannot work with useCookie hooks here so we directly use js-cookie
import createSnackbarSlice, { type Slice as SnackbarSlice } from '@/store/modules/snackbar';
import createUTMsSlice, { type Slice as UTMsSlice } from '@/store/modules/utm';
import createUserSlice, { type States as UserStates, type Slice as UserSlice } from '@auth/store/user';
import { COOKIE_KEY, COOKIE_OPTIONS } from '@auth/configs';

//* custom persist storage that used cookies
const persistCookieStorage: PersistStorage<UserStates> = {
    //bellow methods will be called automatically by zustand
    setItem: (name, value) => {
        //automatically called when we use set() method of zustand store
        try {
            //we have value.state.user , value.version ... we need to pass whole value to cookie
            Cookie.set(name, JSON.stringify(value), COOKIE_OPTIONS);
        } catch (err) {}
    },
    getItem: (name) => {
        //automatically called when we use get() method of zustand store
        try {
            return JSON.parse(Cookie.get(name) as string) || null; //we only get value.state.user part from cookie
        } catch (err) {
            return null;
        }
    },
    removeItem: (name) => {
        //called by zustand internally and not getting called when we use set(<initial-state>) and we manually need to clear localStorage,cookie,...
        Cookie.remove(name, COOKIE_OPTIONS);
    }
};

type Store = SnackbarSlice & UTMsSlice & UserSlice;

const useStore = create<Store, [['zustand/devtools', unknown], ['zustand/persist', unknown]]>(
    devtools(
        persist(
            (...args) => ({
                ...createSnackbarSlice(...args),
                ...createUTMsSlice(...args),
                ...createUserSlice(...args)
            }),
            {
                // default persist storage is localStorage key but here we use cookie
                name: COOKIE_KEY, //cookie name
                partialize: (state) => ({ user: state.user }), //only persist 'user' part of slice not getters,actions,...
                storage: persistCookieStorage //if we don't set it then zustand uses localStorage for persist data here we set custom cookie storage
            }
        ),
        { enabled: process.env.NODE_ENV === 'development', name: 'store' }
    )
);

export default useStore;

//? Usage:
//* in zustand just like useState we should use copy of nested data types like objects,arrays
//* we have useShallow hook in zustand to prevent extra re-renders
// import useStore from '@/store';
// const user = useStore((state) => state.user); //no need to define getters for zustand states and we can directly access it
// const isLoggedIn = useStore((state) => state.isLoggedIn()); //we call getter function and work its return value
// const login = useStore((state) => state.login); //get reference to action and use it with login()
// const logout = useStore((state) => state.logout); //get each state,getter,action separately
// <button onClick={() => login({name: 'name',email: 'email'})}> login </button>
// <button onClick={() => logout()}> logout </button>
//* use set,get methods of zustand:
// isLoggedIn: () => !!get().user.token , //simple getter using get() method
// login: user =>  {
//     set({ user }, undefined, 'user/login'); //use set(<data>) syntax ... second,third args are optional and we only set them for devtools
// },
// updateUser: (newUser) => {
//     set((state) => ({user: {...state.user, ...newUser }})); //use set(oldState=>...) syntax for access to old state
// }
//* access to zustand outside of react component/hooks:
// import store from '@/store';
// store.getState().snackbar //get value
// store.getState().setSnackbar({ type: 'error', show: true, message: 'message' }); //call action
// store.getState().logout(); //call action
