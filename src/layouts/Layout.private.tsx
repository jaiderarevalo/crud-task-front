import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ThemedSuspense from '../toggle/ThemedSuspense';
import Main from '../containers/Main';


const LayoutPrivate = () => {
	return (
		<div>

			<div className='flex flex-col flex-1 w-full'>
				<Main>
					<div className='pt-10'>
						<Suspense fallback={<ThemedSuspense />}>
							<Outlet />
						</Suspense>
					</div>
				</Main>
			</div>
		</div>
	);
};

export default LayoutPrivate;
