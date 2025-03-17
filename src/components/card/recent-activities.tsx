import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentActivities = [
  {
    user: 'John Doe',
    action: 'closed a deal with',
    target: 'Acme Inc',
    value: '$50,000',
    time: '2 hours ago',
  },
  {
    user: 'Jane Smith',
    action: 'added a new lead',
    target: 'TechCorp',
    value: '',
    time: '4 hours ago',
  },
  {
    user: 'Bob Johnson',
    action: 'updated sales forecast for',
    target: 'Q3',
    value: '+$100,000',
    time: 'Yesterday',
  },
  {
    user: 'Alice Brown',
    action: 'scheduled a meeting with',
    target: 'Globex Corporation',
    value: '',
    time: 'Yesterday',
  },
  {
    user: 'Charlie Davis',
    action: 'achieved monthly target of',
    target: '',
    value: '$200,000',
    time: '2 days ago',
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${activity.user.replace(' ', '-')}.png`}
                  alt={activity.user}
                />
                <AvatarFallback>
                  {activity.user
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user}</span>{' '}
                  {activity.action} {activity.target}
                  {activity.value && (
                    <span className="font-semibold"> {activity.value}</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
