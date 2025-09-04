"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, FileText, Eye, Globe, MessageSquare, Activity } from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const stats = [
  {
    title: "Total Visitors",
    value: "12,345",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Page Views",
    value: "45,678",
    change: "+8%",
    icon: Eye,
    color: "text-green-600",
  },
  {
    title: "Content Items",
    value: "156",
    change: "+3%",
    icon: FileText,
    color: "text-purple-600",
  },
  {
    title: "Active Sessions",
    value: "89",
    change: "+15%",
    icon: Activity,
    color: "text-orange-600",
  },
]

const chartData = [
  { name: "Mon", visitors: 120 },
  { name: "Tue", visitors: 190 },
  { name: "Wed", visitors: 300 },
  { name: "Thu", visitors: 250 },
  { name: "Fri", visitors: 180 },
  { name: "Sat", visitors: 220 },
  { name: "Sun", visitors: 160 },
]

const recentActivities = [
  {
    id: 1,
    action: "Updated homepage slider",
    user: "DiabloNova",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    action: "Added new special offer",
    user: "DiabloNova",
    time: "4 hours ago",
    icon: MessageSquare,
  },
  {
    id: 3,
    action: "Modified contact information",
    user: "DiabloNova",
    time: "1 day ago",
    icon: Globe,
  },
  {
    id: 4,
    action: "Updated service descriptions",
    user: "DiabloNova",
    time: "2 days ago",
    icon: FileText,
  },
]

const quickActions = [
  {
    title: "Manage Content",
    description: "Edit website content and pages",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Update Slider",
    description: "Manage homepage slider images",
    href: "/admin/slider",
    icon: Globe,
  },
  {
    title: "Special Offers",
    description: "Add or edit special offers",
    href: "/admin/offers",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    description: "Configure admin settings",
    href: "/admin/settings",
    icon: Users,
  },
]

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Rasha Gostar Pazirik Admin Panel</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Time</p>
            <p className="text-lg font-semibold">{currentTime.toLocaleString()}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Visitors</CardTitle>
              <CardDescription>Visitor statistics for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest content updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <Link key={index} href={action.href}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <IconComponent className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <span className="text-sm font-medium">Website Status</span>
                <span className="text-sm text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-blue-600 dark:text-blue-400">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <span className="text-sm font-medium">Last Backup</span>
                <span className="text-sm text-yellow-600 dark:text-yellow-400">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
