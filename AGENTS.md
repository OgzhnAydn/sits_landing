<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the public site as a route-based TanStack Start experience with the MirLeon design system centralized in `src/styles.css`, so every page stays visually consistent.
- Use the shared Button with asChild for public-page calls to action; this preserves accessible controls and consistent interaction styling.
- Hero globe is a dependency-free canvas orthographic renderer fed by pre-generated land dots (`src/lib/land-dots.ts`); regenerate that file offline instead of adding map/3D libraries, to keep the bundle small and SSR-safe.
