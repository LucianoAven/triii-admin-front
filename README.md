# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Translation (I18Next)
IMPORTANTE
    Las carpetas de idiomas (ES, En) deben tener los mismos archivos .json

Para el uso de la librería en los componentes se requiere:

    -Importar hook:
        
        import { useTranslation } from 'react-i18next'; 

    -Declarar una constante "{ t }" para usar en la vista y pasar como parametro los archivos (que se encuentran en public/locales) que se deban usar en el componente:
        
        caso de usar un solo archivo:
            const { t } = useTranslation('archivoJSON1');

        caso de usar multiples archivos:
            const { t } = useTranslation(['archivoJSON1', 'archivoJSON2']); //el primer parametro se toma como default

    -Uso de la constante:

       Forma 1: {t('objeto.valor')} //en el caso de contar contar con un solo parametro o se usa el primer parametro como default
       ejemplo:
            <h3>{t('global.user')}</h3>
       
       
       Forma 2: {t('objeto.valor', {ns: 'archivoJSONX'})}  
       ejemplo:
            <span className="">{t('user.role', {ns: 'translation'})}</span>

        *NOTA: ambas formas son válidas en caso de que se llame a un solo archivo, no obstante, la forma 2 es requerida para los multiples archivos ya que se debe especificar a que parametro(archivo) pertenece el objeto 
