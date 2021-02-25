# Angular project: "Best Professional Store"

Project hosted in Netlify. [Link to the deployment](https://jmp-angular-shop.netlify.app/).

This project is just to consolidate the concepts learned through [Maximilian's Angular Course](https://www.udemy.com/course/the-complete-guide-to-angular-2/).

----------------

## Navigation Routes:

- /shop 
- /items/:id 
- /login (GUARDed: when user is authenticated, redirects to shop)
- /signin (GUARDed: when user is authenticated, redirects to shop)
- /cart 
- /* -> redirect to /shop

## Managing App State

To practice, I've handled the app state in two different ways:

**NGRX**:
- user -> manages auth state related to sessions
- cart -> manages the cart state (accessed from navbar-cart-preview and cart)
	
**State managed from service:**
- items -> manages items from /shop and /items/:id

## Persistence:

Current session and cart is stored in local cache and retrieved at each refresh from the browser. 

All persistence is managed through services.

## Playing with Observables:

**Behaviour:**
- Items.component subscribes to getItems from items.service and retrieves the items.
- When any component calls changeFilter from items.service, the service will emit the modified items to the subscribers of getItems automatically.

**Logic:**

shop.component.ts subscribes to getItems() Observable from items.service to retrieve and display them.

getItems(): Observable<Item[]> [from items.service] does:
- First time: fetches items, stores them and emits the items to the subscribers.
- listens for changes to this.filter property and emits items to subscribers applying the filter.

changeFilter() from items.service does:
- modifies this.filter and emits the change to subscribers of the filter Observable (getItems method, which then will emit the new filtered items).

**Note:** This is not the best approach to this use case but it's a great way to practice with Observables.

## Angular Forms and Validation:

Angular forms are used in /login & /signin paths.

This application validates the forms in front-end and also displays validation errors from back-end.
