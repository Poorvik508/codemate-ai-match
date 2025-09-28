import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageSquare, MapPin, Clock, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: number;
  name: string;
  title: string;
  location: string;
  availability: string;
  skills: string[];
  bio: string;
  matchPercentage: number;
  avatar?: string;
}

const Matches = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");

  const partners: Partner[] = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Frontend React Specialist",
      location: "Austin, TX",
      availability: "Weekends",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      bio: "Love building beautiful user interfaces with React. Looking to collaborate on innovative web applications.",
      matchPercentage: 95,
      avatar: "/placeholder-avatar-1.jpg"
    },
    {
      id: 2,
      name: "Mike Johnson",
      title: "Backend Python Developer",
      location: "Remote",
      availability: "Evenings",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      bio: "Backend specialist with focus on scalable systems. Interested in AI/ML projects.",
      matchPercentage: 88,
      avatar: "/placeholder-avatar-2.jpg"
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      title: "Full-Stack Engineer",
      location: "New York, NY",
      availability: "Flexible",
      skills: ["JavaScript", "Node.js", "React", "MongoDB"],
      bio: "Full-stack developer passionate about startup projects and modern web technologies.",
      matchPercentage: 82,
      avatar: "/placeholder-avatar-3.jpg"
    },
    {
      id: 4,
      name: "Emily Watson",
      title: "Mobile App Developer",
      location: "San Francisco, CA",
      availability: "Weekdays",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      bio: "Mobile-first developer with experience in cross-platform apps. Love creating smooth user experiences.",
      matchPercentage: 78,
      avatar: "/placeholder-avatar-4.jpg"
    }
  ];

  const handleLike = (partnerId: number, partnerName: string) => {
    toast({
      title: "Match Liked!",
      description: `You liked ${partnerName}. They'll be notified of your interest.`,
    });
  };

  const handleMessage = (partnerId: number, partnerName: string) => {
    toast({
      title: "Starting Conversation",
      description: `Opening chat with ${partnerName}...`,
    });
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = skillFilter === "all" || partner.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
          <p className="text-muted-foreground">
            Coding partners matched based on your skills and preferences
          </p>
        </div>

        {/* Filters */}
        <Card className="gradient-card border-border/50 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="relative">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={partner.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg">
                      {partner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-success to-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                    {partner.matchPercentage}% match
                  </div>
                </div>
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{partner.title}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {partner.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {partner.availability}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {partner.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {partner.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{partner.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {partner.bio}
                </p>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-success/10 hover:border-success hover:text-success"
                    onClick={() => handleLike(partner.id, partner.name)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    onClick={() => handleMessage(partner.id, partner.name)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <Card className="gradient-card border-border/50 text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No matches found</h3>
                <p>Try adjusting your search criteria or check back later for new matches.</p>
              </div>
              <Button variant="outline" onClick={() => {setSearchTerm(""); setSkillFilter("all");}}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Matches;