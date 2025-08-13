import { useState } from "react";
import { Users, Plus, Share2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const GroupOrderButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  const { toast } = useToast();

  const handleCreateGroup = () => {
    const newGroupCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGroupCode(newGroupCode);
    navigator.clipboard.writeText(newGroupCode);
    toast({
      title: "Group Created! 🎉",
      description: "Group code copied to clipboard. Share with friends to start ordering together!",
    });
  };

  const handleJoinGroup = () => {
    if (groupCode.length < 6) {
      toast({
        title: "Invalid Group Code",
        description: "Please enter a valid 6-character group code.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Joined Group! 👥",
      description: `Successfully joined group ${groupCode}`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>Group Order</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Group Ordering</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Create New Group */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Plus className="h-5 w-5 text-success" />
                <span>Create New Group</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Start a group order and invite friends to add items to the same cart.
              </p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Share2 className="h-3 w-3" />
                    <span>Easy Sharing</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Calculator className="h-3 w-3" />
                    <span>UPI Split Bill</span>
                  </Badge>
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Live Updates</span>
                  </Badge>
                </div>
                
                <Button 
                  onClick={handleCreateGroup}
                  className="w-full"
                >
                  Create Group Order
                </Button>
                
                {groupCode && (
                  <div className="p-3 bg-success/10 rounded-lg">
                    <p className="text-sm font-medium text-success mb-1">Group Code Generated:</p>
                    <p className="text-2xl font-bold text-center tracking-wider text-success">
                      {groupCode}
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Share this code with your friends
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Join Existing Group */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Join Existing Group</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the group code shared by your friend to join their order.
              </p>
              
              <div className="space-y-3">
                <Input
                  placeholder="Enter 6-character group code"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="text-center text-lg tracking-wider font-mono"
                />
                
                <Button 
                  variant="outline" 
                  onClick={handleJoinGroup}
                  className="w-full"
                  disabled={groupCode.length < 6}
                >
                  Join Group Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="text-center space-y-2">
            <h4 className="font-medium text-sm">How Group Ordering Works:</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>1. Create or join a group with friends</p>
              <p>2. Everyone adds items to the shared cart</p>
              <p>3. Split the bill automatically via UPI</p>
              <p>4. Track order together in real-time</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};