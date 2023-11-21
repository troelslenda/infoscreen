import { NavigationPath } from '@infoscreen/shared';
import socketService from './socket.service';


const navigateService = {
  _debounceId: null,
  _debounceTime: 15000,
  _debouncedNavigateToInfo: () => {
    // Cancels the setTimeout method execution
    clearTimeout(navigateService._debounceId);
    // Executes the func after delay time.
    navigateService._debounceId = setTimeout(() => {
        console.log('reset nav')
      socketService.sendToClient({
        navigate_to_page: 'none' as NavigationPath,
      });
    }, navigateService._debounceTime);
  },
  navigateTo: (path: NavigationPath) => {
    
    socketService.sendToClient({
      navigate_to_page: path,
    });

     navigateService._debouncedNavigateToInfo();
  },
};

export default navigateService;
