import Note from '@/entities/note/note';
import ThemeComponent from '@/entities/note/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {
	return (
		<>
			<ThemeComponent>
				<QueryClientProvider client={queryClient}>
					<Note/>
				</QueryClientProvider>
			</ThemeComponent>
		</>
	);
}

export default App;
