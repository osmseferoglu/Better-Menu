# Better Menu - Cafeteria

<div align="center">

![Better Menu Logo](/public/favicon-96x96.png)

A modern, user-friendly menu application for Cafeteria that displays daily meals, calorie information, and supports both light and dark modes.


</div>

## ✨ Features

- 🌓 **Theme Support**: Seamless dark/light mode switching
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🖼️ **Food Images**: Quick access to food images via Google search
- 📊 **Calorie Tracking**: Display of individual and total calorie information
- 🇹🇷 **Turkish Localization**: Dates and menu items in Turkish
- ⚡ **Performance**: Built with Next.js for optimal performance
- 🎨 **Modern UI**: Clean and intuitive interface using Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/osmseferoglu/better-menu.git
cd better-menu
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add:
```bash
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - The React Framework
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Radix UI](https://www.radix-ui.com/) - For UI components
- [date-fns](https://date-fns.org/) - For date formatting
- [Lucide Icons](https://lucide.dev/) - For beautiful icons

## 📖 Project Structure

```
better-menu/
├── src/
│   ├── app/
│   │   └── page.tsx      # Main menu page
│   ├── components/       # Reusable components
│   └── types/           # TypeScript definitions
├── public/              # Static assets
└── package.json
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | The URL for the menu API endpoint | Yes |

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Project Link: [https://github.com/osmseferoglu/better-menu](https://github.com/osmseferoglu/better-menu)

## 🙏 Acknowledgments
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com) for hosting

---