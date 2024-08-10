import { ThemeProvider } from './theme-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
		{children}
	</ThemeProvider>
)
