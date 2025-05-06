import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/league.css";
import "reveal.js/plugin/highlight/monokai.css";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";
import sdk from "@stackblitz/sdk";

function App() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    const stackBlitzLitEmbed = document.querySelector("#stackblitz-lit-embed");
    const stackBlitzReactEmbed = document.querySelector(
      "#stackblitz-react-embed"
    );
    const stackBlitzAngularEmbed = document.querySelector(
      "#stackblitz-angular-embed"
    );

    sdk.embedProjectId(
      stackBlitzLitEmbed as HTMLElement,
      "lit-with-complex-preact-signal-state",
      {
        forceEmbedLayout: true,
        openFile: "src/my-element.ts",
      }
    );

    sdk.embedProjectId(
      stackBlitzReactEmbed as HTMLElement,
      "react-signals-counter",
      {
        forceEmbedLayout: true,
        openFile: "src/App.tsx",
      }
    );

    sdk.embedProjectId(
      stackBlitzAngularEmbed as HTMLElement,
      "angular-with-signals",
      {
        forceEmbedLayout: true,
        openFile: "src/counter.ts",
      }
    );

    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: "slide",
      // other config options
    });

    deckRef.current
      .initialize({
        plugins: [Highlight, RevealNotes],
        // view: "scroll",
        // Force the scrollbar to remain visible
        // scrollProgress: true,
      })
      .then(() => {
        // good place for event handlers and plugin setups
      });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    };
  }, []);

  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        {/* Title Slide */}
        <section data-auto-animate>
          <img
            src="/javascript-signals.png"
            alt="JavaScript Signals"
            style={{ height: "15rem" }}
          />
          <h3>A New Approach to Reactive State Management</h3>

          <p>By Quin Carter</p>
          <aside className="notes">
            Welcome everyone! Today we're going to explore JavaScript Signals, a
            new and exciting approach to state management that's gaining
            traction in the JavaScript ecosystem. This presentation will cover
            both the theoretical concepts and practical implementations across
            different frameworks.
          </aside>
        </section>

        {/* About Me */}
        <section data-auto-animate>
          <h2>About Me</h2>
          <ul>
            <li className="fragment">
              Lead Engineer at Capital One (6+ years)
            </li>
            <li className="fragment">Passionate about Frontend Development</li>
            <li className="fragment">Coffee enthusiast</li>
          </ul>
          <aside className="notes">
            I've been working with various state management solutions throughout
            my career, from Redux to MobX, even using the Context API in React
            and Lit Element, and now I'm excited to share my experience with
            Signals. My background in frontend development has given me a unique
            perspective on how different state management approaches impact
            developer experience and application performance.
          </aside>
        </section>

        {/* State in JavaScript */}
        <section data-auto-animate>
          <h2>Understanding State in JavaScript</h2>
          <p>What is state and why does it matter?</p>
          <aside className="notes">
            State is the heart of any interactive application. It represents the
            data that changes over time and drives our UI updates. Traditional
            state management often leads to complex code and performance issues.
            This is where Signals come in as a potential solution. Think of
            state as the memory of your application - it needs to be both
            efficient and predictable.
          </aside>
        </section>

        {/* Types of State */}
        <section data-auto-animate>
          <section data-auto-animate>
            <h2>Types of State</h2>
            <p>Different levels of state in modern applications</p>
            <aside className="notes">
              Understanding the different types of state is crucial for choosing
              the right state management solution. Each type has its own
              challenges and requirements for management and updates.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Component State</h3>
            <p>State that belongs to and is managed by a single component</p>
            <img
              src="/component-state.webp"
              alt="Component State"
              style={{ height: "27rem" }}
            />
            <aside className="notes">
              Component state is the most localized form of state. Think of it
              as the internal memory of a component. While simple to manage, it
              can become problematic when you need to share this state with
              other components. This is where we often start seeing prop
              drilling and complex component hierarchies. This is like the color
              of a button, whether it is disabled or enabled, checked or
              unchecked, etc.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Application State</h3>
            <p>State shared between multiple components in a specific area</p>
            <p>Story of your app at any given time</p>
            <img
              src="/redux.jpeg"
              style={{ height: "24rem" }}
              alt="Redux State"
            />
            <aside className="notes">
              <p>
                Application state represents a middle ground - it's shared but
                not global. This is where many applications start to introduce
                state management libraries. The challenge here is maintaining
                consistency while keeping the code maintainable.
              </p>{" "}
              <p>
                This is like the theme of your app, whether it is light or dark,
                whether it is a dark mode or light mode, etc.
              </p>{" "}
              <p>
                If you have a snapshot of your state, you could technically
                restore your app to a given state at that time, if your
                components support it.
              </p>
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Global State</h3>
            <p>State accessible throughout the entire application</p>
            <img
              className="fragment"
              src="/liarliar.gif"
              alt="Jim Carrey Liar Liar"
            />
            <aside className="notes">
              Global state is the most challenging to manage effectively. It's
              like having a shared memory that every part of your application
              can access and modify. This is where traditional solutions often
              fall short, leading to complex update patterns and performance
              issues.
            </aside>
          </section>
        </section>

        <section data-auto-animate>
          <h3>State Example</h3>
          <h4>Button</h4>
          <button disabled className="hoverable">
            I am Disabled
          </button>
          <button className="hoverable">I change when you hover me</button>
        </section>

        {/* Introducing Signals */}
        <section data-auto-animate>
          <h2>Introducing Signals</h2>
          <p>A new primitive for reactive programming</p>
        </section>
        <section data-auto-animate>
          <h2>Introducing Signals</h2>
          <p>So what are they?</p>
          <p className="fragment">
            Signals are data structures for managing observable state.
          </p>
          <aside className="notes">
            Signals represent a fundamental shift in how we think about state
            management. They're not just another state management library -
            they're a new primitive that changes how we handle reactivity. The
            key innovation is their fine-grained reactivity model, which allows
            for more efficient updates and better performance.
          </aside>
        </section>
        <section data-auto-animate>
          <h3>What Can I Store in Signals?</h3>
          <p className="fragment">Single Value</p>
          <p className="fragment">Computed Value</p>
          <p className="fragment">Array</p>
          <p className="fragment">Object</p>
          <p className="fragment">Function</p>
          <p className="fragment">The world 🌎</p>
          <p className="fragment">The Moon 🌙</p>
          <aside className="notes">
            <p>So what can i store?</p>
            <p>
              You can store anything that you would store in a variable. So
              Really it can store whatever is useful for your application to use
              inside of it.
            </p>
          </aside>
        </section>

        {/* TC39 Proposal */}
        <section data-auto-animate>
          <h2>TC39 Proposal for Signals</h2>
          <p>
            <a href="https://github.com/tc39/proposal-signals" target="_blank">
              Current Status
            </a>{" "}
            and future outlook
          </p>
          <img
            src="/tc39-qr.png"
            alt="Signals Proposal"
            style={{ height: "12rem" }}
          />
          <aside className="notes">
            The TC39 proposal for Signals is currently in Stage 1, which means
            it's still early in the standardization process. This proposal aims
            to bring Signals into the JavaScript language itself, making them a
            native feature. The proposal has gained significant traction, with
            major frameworks already implementing their own versions. This
            standardization effort could revolutionize how we handle state in
            JavaScript applications.
          </aside>
        </section>
        <section data-auto-animate>
          <h2>TC39 Proposal for Signals</h2>
          <p>Why do I Care about TC39?</p>
          <span>
            <img
              src="/swedish-chef-baking.gif"
              alt="Swedish Chef Baking"
              style={{ height: "15rem" }}
            />
          </span>
          <span>
            <img
              src="/bake-off.gif"
              alt="Bake Off"
              style={{ height: "15rem" }}
            />
          </span>
          <aside className="notes">
            TC39 is the technical committee responsible for evolving JavaScript.
            It's made up of representatives from major browser vendors, tech
            companies, and JavaScript experts. When TC39 approves a proposal, it
            becomes part of the JavaScript language itself, available natively
            in all browsers. This means Signals could become a built-in feature
            of JavaScript, not just a library or framework feature. The
            committee follows a rigorous process with multiple stages, ensuring
            proposals are well-thought-out and widely supported.
          </aside>
        </section>

        <section data-auto-animate>
          <h2>TC39 Process</h2>
          <ul>
            <li className="fragment">Stage 0: Strawperson - Initial idea</li>
            <li className="fragment">Stage 1: Proposal - Formal proposal</li>
            <li className="fragment">Stage 2: Draft - Initial spec</li>
            <li className="fragment">Stage 3: Candidate - Complete spec</li>
            <li className="fragment">
              Stage 4: Finished - Ready for inclusion
            </li>
          </ul>
          <aside className="notes">
            The TC39 process ensures that new JavaScript features are thoroughly
            vetted before becoming part of the language. Each stage requires
            increasing levels of detail and implementation experience. Signals
            are currently at Stage 1, which means they have a formal proposal
            but still need significant work before becoming part of JavaScript.
            This process helps prevent bad features from being added to the
            language and ensures compatibility across different JavaScript
            environments.
          </aside>
        </section>

        <section data-auto-animate>
          <h2>Why TC39 Matters</h2>
          <ul>
            <li className="fragment">Native browser support</li>
            <li className="fragment">Better performance</li>
            <li className="fragment">Standardized implementation</li>
            <li className="fragment">Future-proof code</li>
          </ul>
          <aside className="notes">
            When a feature becomes part of the JavaScript language through TC39,
            it gets native browser support. This means better performance than
            library implementations and no need for additional dependencies. A
            standardized implementation ensures consistent behavior across
            different environments. Writing code that uses TC39-approved
            features means your code will be future-proof and maintainable. The
            Signals proposal could revolutionize how we handle state in
            JavaScript applications, making it a native part of the language.
          </aside>
        </section>

        {/* How Do Signals Work? */}
        <section data-auto-animate>
          <section data-auto-animate>
            <h2>How Do Signals Work?</h2>
            <p>
              What is the first thing that comes to mind when you think about a
              signal?
            </p>
            <aside className="notes">
              <p>
                What is the first thing that comes to mind when you think about
                a signal?
              </p>
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Pub/Sub?</h3>
            <img
              src="/pubsub-diagram.png"
              alt="Pub/Sub"
              style={{ height: "20rem" }}
            />
          </section>
          <section data-auto-animate>
            <h3>How do they work, really?</h3>
            <p>There are really only 2 main units</p>
            <ul>
              <li>Publishers — Components that triggered the events.</li>
              <li>
                Subscribers — Components that listen for specific signals and
                react accordingly.
              </li>
            </ul>
          </section>
          <section data-auto-animate>
            <h3>How do they work, really?</h3>
            <img
              src="/amazon-example.png"
              alt="Amazon Example"
              style={{ height: "30rem" }}
            />
          </section>
        </section>

        <section data-auto-animate>
          <h3>So When do I use Signals?</h3>
          <ul>
            <li>
              You need direct communication between components without the
              complexity of an intermediary event bus.
            </li>
            <li className="fragment">
              Efficiency, modularity, and scalability are priorities in your
              application architecture.
            </li>
            <img
              src="/radio-national-radio-day.gif"
              alt="Radio National Radio Day"
              style={{ height: "15rem" }}
            />
          </ul>
        </section>

        {/* Implementations */}
        <section data-auto-animate>
          <section data-auto-animate>
            <h2>Signal Implementations</h2>
            <p>How different frameworks approach signals</p>
            <img src="/anton-hacker.gif" alt="hacker" />
            <aside className="notes">
              Let's look at how different frameworks are implementing Signals.
              Each implementation has its own unique approach, but they all
              share the core concepts of fine-grained reactivity. We'll start
              with vanilla JavaScript to understand the fundamentals, then move
              to framework-specific implementations.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Vanilla JavaScript</h3>
            <pre>
              <code
                style={{ maxHeight: "unset" }}
                className="language-javascript"
                data-noescape
                data-line-numbers="1,5-6|1,8-9"
              >
                {`//
// Code developers might write to build their signals-based state...
//

// State signals hold values:
const count = new Signal.State(0);

// Computed signals wrap computations that use other signals:
const doubleCount = new Signal.Computed(() => count.get() * 2);
`}
              </code>
            </pre>
            <aside className="notes">
              Here we see the basic building blocks of Signals in vanilla
              JavaScript. Signal.State creates a mutable signal that can hold
              any value. Signal.Computed creates a derived signal that
              automatically updates when its dependencies change. Notice how
              clean and declarative this code is - no complex setup or
              boilerplate required.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Low Level Code</h3>
            <pre>
              <code
                style={{ maxHeight: "unset" }}
                className="language-javascript"
                data-noescape
              >
                {`//
// Lower-level code of the sort that will typically be inside frameworks and
// signal-consuming libraries...
//

// Watchers are notified when signals that they watch change:
const watcher = new Signal.subtle.Watcher(async () => {
  // Notify callbacks are not allowed to access signals synchronously
  await 0;
  console.log('doubleCount is', doubleCount);
  // Watchers have to be re-enabled after they run:
  watcher.watch();
});
watcher.watch(doubleCount);

// Computed signals are lazy, so we need to read it to run the computation and
// potentially notify watchers:
doubleCount.get();
`}
              </code>
            </pre>
            <aside className="notes">
              This shows the lower-level implementation details that frameworks
              typically handle for us. The Watcher API is particularly
              interesting - it provides a way to react to signal changes. Notice
              the async nature of the watcher callback - this is intentional to
              prevent synchronous signal access. The lazy evaluation of computed
              signals is a key performance optimization.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>React</h3>
            <p>Integrating preact-signals with React</p>
          </section>
          <section data-auto-animate className="stackblitz-embed">
            <div id="stackblitz-react-embed"></div>
          </section>
          <section data-auto-animate>
            <h3>Angular</h3>
            <p>Angular's built-in signals implementation</p>
          </section>
          <section data-auto-animate className="stackblitz-embed">
            <div id="stackblitz-angular-embed"></div>
          </section>
          <section data-auto-animate>
            <h3>Vue</h3>
            <p>Vue's reactivity system and signals</p>
            <pre>
              <code
                style={{ maxHeight: "unset" }}
                className="language-javascript"
                data-noescape
                data-line-numbers="1,2|1,5|1,8|1,11"
              >{`// Using Vue's built-in reactivity
import { ref, computed } from 'vue'

// Create a reactive signal
const count = ref(0)

// Create a computed signal
const doubled = computed(() => count.value * 2)

// Update the signal
count.value++`}</code>
            </pre>
            <aside className="notes">
              Vue's reactivity system is actually very similar to signals in
              concept. The ref() function creates a reactive reference, similar
              to a signal. Notice how we use .value to access and modify the
              signal value. Vue's computed() function works like a derived
              signal, automatically updating when dependencies change.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Vue 3.6 Alien Signals</h3>
            <pre>
              <code
                style={{ maxHeight: "unset" }}
                className="language-javascript"
                data-noescape
                data-line-numbers="1,2|1,4-5|1,7-8|1,16"
              >{`// Using Vue's new Alien Signals
import { signal, computed, effect } from 'vue'

// Create a signal (no more .value needed!)
const count = signal(0)

// Create a computed signal
const doubled = computed(() => count() * 2)

// Create an effect
effect(() => {
  console.log('Count changed:', count())
})

// Update the signal
count(1)`}</code>
            </pre>
            <aside className="notes">
              Vue 3.6 introduces Alien Signals, a more direct implementation of
              the signals pattern. Notice how we no longer need to use .value -
              signals are now function-based. This makes the API more consistent
              with other signal implementations. The effect() function provides
              a way to react to signal changes, similar to SolidJS.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>Alien Signals Component</h3>
            <pre>
              <code
                className="language-javascript"
                data-noescape
                data-line-numbers="1|1,6-7|1,9-11|1,20-24"
              >{`import { signal, computed } from 'vue'

export default {
  setup() {
    // Create signals
    const count = signal(0)
    const doubled = computed(() => count() * 2)
    
    function increment() {
      count(count() + 1)
    }
    
    return {
      count,
      doubled,
      increment
    }
  },
  template: \`
    <div>
      <p>Count: {{ count() }}</p>
      <p>Doubled: {{ doubled() }}</p>
      <button @click="increment">Increment</button>
    </div>
  \`
}`}</code>
            </pre>
            <aside className="notes">
              Alien Signals provide a more ergonomic API for Vue components.
              Notice how we call the signal functions directly in the template.
              This approach is more aligned with the TC39 proposal for signals.
              The syntax is cleaner and more intuitive than the previous
              ref-based approach.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>Alien Signals Features</h3>
            <ul>
              <li className="fragment">Function-based API</li>
              <li className="fragment">Fine-grained reactivity</li>
              <li className="fragment">Better performance</li>
              <li className="fragment">TC39 proposal aligned</li>
            </ul>
            <aside className="notes">
              Alien Signals represent a significant evolution in Vue's
              reactivity system. The function-based API makes it more intuitive
              and consistent with other frameworks. Fine-grained reactivity
              means better performance as only the necessary parts of the UI
              update. This implementation aligns with the TC39 proposal, making
              it future-proof.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>SolidJS</h3>
            <p>Signals as a core primitive</p>
            <pre>
              <code
                style={{ maxHeight: "unset" }}
                className="language-javascript"
                data-noescape
                data-line-numbers="1,2|1,4-5|1,7-8|1,10-11"
              >{`// Create a basic signal
const count = createSignal(0);

// Read the signal value
console.log(count()); // 0

// Update the signal value
setCount(1);

// Create a derived signal (computed)
const doubled = createMemo(() => count() * 2);`}</code>
            </pre>
            <aside className="notes">
              SolidJS has one of the most elegant implementations of signals.
              The createSignal function returns a tuple with a getter and setter
              function. Notice how we use the getter function directly to read
              the value - this is what enables the fine-grained reactivity. The
              createMemo function creates a derived signal that automatically
              updates when its dependencies change. This is much simpler than
              traditional state management solutions and provides better
              performance.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>SolidJS Component Example</h3>
            <pre>
              <code
                style={{ maxHeight: "unset" }}
                className="language-javascript"
                data-noescape
                data-line-numbers="1|1,4|1,8-9"
              >{`import { createSignal } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );}`}</code>
            </pre>
            <aside className="notes">
              Here's a practical example of using signals in a SolidJS
              component. Notice how we destructure the signal into a getter and
              setter. The count() call in the JSX automatically creates a
              subscription to the signal. When the signal changes, only the
              specific part of the DOM that depends on it will update. This is
              much more efficient than re-rendering the entire component.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Preact</h3>
            <p>Native signals support</p>
            <pre>
              <code
                className="language-javascript"
                data-noescape
                data-line-numbers="1,2|1,4-5|1,7-8|1,10-11"
              >{`// Using Preact Signals
import { signal, computed, effect } from '@preact/signals'

// Create a signal
const count = signal(0)

// Create a computed signal
const doubled = computed(() => count.value * 2)

// Create an effect
effect(() => {
  console.log('Count changed:', count.value)
})`}</code>
            </pre>
            <aside className="notes">
              Preact's signals implementation is one of the most mature and
              performant. It uses a .value property to access and modify
              signals, similar to Vue's refs. The implementation is lightweight
              and can be used with any framework. Preact's signals are
              particularly efficient because they're designed to work with
              Preact's virtual DOM.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>Preact Component Example</h3>
            <pre>
              <code
                className="language-javascript"
                data-noescape
              >{`import { signal, computed } from '@preact/signals'
import { render } from 'preact'

function Counter() {
  const count = signal(0)
  const doubled = computed(() => count.value * 2)
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <p>Doubled: {doubled.value}</p>
      <button onClick={() => count.value++}>
        Increment
      </button>
    </div>
  )
}`}</code>
            </pre>
            <aside className="notes">
              Preact components can use signals directly in their render
              functions. Notice how we access signal values using .value in the
              JSX. The component will automatically re-render when signal values
              change. This is more efficient than traditional state management
              as it only updates what changed.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>Preact Signals Features</h3>
            <ul>
              <li className="fragment">Framework-agnostic</li>
              <li className="fragment">Fine-grained updates</li>
              <li className="fragment">Batched updates</li>
              <li className="fragment">Debug tools</li>
            </ul>
            <pre>
              <code
                className="language-javascript"
                data-noescape
              >{`// Batch multiple updates
import { batch } from '@preact/signals'

batch(() => {
  count.value++
  name.value = 'New Name'
  // Only one re-render
})

// Debug signals
import { debug } from '@preact/signals'
debug(count)`}</code>
            </pre>
            <aside className="notes">
              Preact's signals can be used with any framework, not just Preact.
              The batch() function allows multiple signal updates to trigger a
              single re-render. Debug tools help track signal changes during
              development. The implementation is optimized for performance with
              minimal overhead.
            </aside>
          </section>

          <section data-auto-animate>
            <h3>Preact Signals Performance</h3>
            <ul>
              <li className="fragment">No unnecessary re-renders</li>
              <li className="fragment">Memory efficient</li>
              <li className="fragment">Tree-shakeable</li>
              <li className="fragment">Small bundle size</li>
            </ul>
            <aside className="notes">
              Preact's signals implementation is highly optimized for
              performance. It only triggers re-renders when necessary, reducing
              unnecessary work. The implementation is memory efficient and
              tree-shakeable. The bundle size is small, making it suitable for
              production use.
            </aside>
          </section>
          <section data-auto-animate>
            <h3>Lit Element</h3>
            <img src="/lit-signals.png" alt="lit signals all your base" />
          </section>
          <section data-auto-animate>
            <h3>Lit Element</h3>
            <p>Using @preact/signals and @lit-labs/signals</p>
            <pre>
              <code
                style={{ maxHeight: "500px" }}
                className="language-javascript"
                data-noescape
                data-line-numbers="1,4-6|1,23-25|1,18"
              >{`
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher, signal} from '@lit-labs/signals';

const count = signal(0);

@customElement('shared-counter')
export class SharedCounterComponent extends SignalWatcher(LitElement) {
  static styles = css\`
    :host {
      display: block;
    }
  \`;

  render() {
    return html\`
      <p>The count is \${count.get()}</p>
      <button @click=\${this.#onClick}>Increment</button>
    \`;
  }

  #onClick() {
    count.set(count.get() + 1);
  }
}`}</code>
            </pre>
          </section>
          <section data-auto-animate className="stackblitz-embed">
            <div id="stackblitz-lit-embed"></div>
          </section>
        </section>

        {/* Conclusion */}
        <section data-auto-animate>
          <h2>Conclusion</h2>
          <p>The future of reactive state management</p>
          <p>Questions?</p>
          <aside className="notes">
            Signals represent a significant step forward in state management.
            Their fine-grained reactivity model offers better performance and
            simpler code. As the TC39 proposal progresses, we can expect to see
            more widespread adoption. The future of state management looks
            promising with Signals leading the way. Thank you for your
            attention! I'm happy to answer any questions you might have.
          </aside>
        </section>
      </div>
    </div>
  );
}

export default App;
