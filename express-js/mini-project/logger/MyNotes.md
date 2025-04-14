Creating a logger to differentiate betwen private and public file so, if logedin then only access
so we need two different routes , public routes ona dprivate routes , so in routes folder --> private.routes.js , public.routes.js

in public.routes.js
we need two routes generate-token,home
in private 
dashboard(only when token)

access this routes in server.js 

NOTE: in thuderclient there is collection to manage your endpoints

In Module js 
__filename cant be accesed directly you need to do 
const __filename = fileURLToPath(import.meta.url);
and for __dirname
const __dirname = path.dirname(__filename);


