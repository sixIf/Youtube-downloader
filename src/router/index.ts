import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import VideoEditor from '@/views/VideoEditor.vue'
import Help from '@/views/Help.vue'
import Settings from '@/views/Settings.vue'
import { DownloadFolderService } from "@/services/downloadFolderService"
import { ApplicationContainer } from "@/di/index"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/exit',
        name: 'exit',
        redirect: { name: 'home' }
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/edit-video/:id',
        name: 'edit-video',
        component: VideoEditor
    },
    {
        path: '/help',
        name: 'help',
        component: Help
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    }
]

const router = new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

// Check if Download Folder is set
router.beforeEach((to, from, next) => {
    const downloadFolderService = ApplicationContainer.resolve(DownloadFolderService)
    if (to.name !== 'settings' && (!downloadFolderService.getDownloadFolder())) next({ name: 'settings' })
    else next()
})

export default router
