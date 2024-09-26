import { createSlice } from '@reduxjs/toolkit';

const iconList = [
  {
    title: 'Trii Team',
    icon: '/img/triiModules/TriiTeam.svg',
    module: '/modulos/triiteam',
  },
  {
    title: 'Trii Chat',
    icon: '/img/triiModules/TriiChat.svg',
    module: '/modulos/triichat',
  },
  {
    title: 'Trii Marketing',
    icon: '/img/triiModules/TriiMarketing.svg',
    module: '/modulos/triimarketing',
  },
  {
    title: 'Trii Ticket',
    icon: '/img/triiModules/TriiTickets.svg',
    module: '/modulos/triiticket',
  },
  {
    title: 'Trii Service',
    icon: '/img/triiModules/TriiService.svg',
    module: '/modulos/triiservice',
  },
  {
    title: 'Trii Cobranzas',
    icon: '/img/triiModules/TriiCobranzas.svg',
    module: '/modulos/triicobranzas',
  },
  {
    title: 'Trii Contactos',
    icon: '/img/triiModules/TriiContacts.svg',
    module: '/modulos/triicontactos',
  },
  {
    title: 'Trii Llamadas',
    icon: '/img/triiModules/TriiCall.svg',
    module: '/modulos/triillamadas',
  },
];

const initialState = {
  iconList,
};


export const iconNavSlice = createSlice({
  name: 'iconNav',
  initialState,
  //   reducers: {
  //     increment: (state) => {
  //       state.value += 1;
  //     },
  //   },
});

export const selectIcon = state => state.iconNav.iconList;

// Action creators are generated for each case reducer function
// export const { increment } = iconNavSlice.actions;

export default iconNavSlice.reducer;
