import { ReactNode } from 'react';

type TypeProps = {
	children: ReactNode;
};

const Main = ({ children }: TypeProps) => {
	return (
		<main className='h-full overflow-y-auto'>
			<div className='container grid px-6 mx-auto'>{children}</div>
		</main>
	);
};

export default Main;
