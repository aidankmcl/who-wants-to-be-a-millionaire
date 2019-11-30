# Pages
Since each individual chunk of functionality (e.g. quiz vs results page) doesn't contain a significant amount of custom logic, I've just handled each section with one "page" file.

In a real-world setting, each of the pages could involve separate API calls along with custom logic that I would typically organize more like:
```
sections/
  ...
  section/
    api.ts
    models.ts
    index.ts <-- exports whatever may be needed outside this section.
    pages/
      index.tsx <-- contains routing info
      A.tsx
      B.tsx
      C.tsx
  ...
```

In this case, I've put the file that describes the trivia interaction in `utils/` to keep the `pages/` directory focused.