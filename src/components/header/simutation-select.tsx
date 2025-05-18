import { Button } from '@/components/ui/button.tsx'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'
import { useCurrentPageConditions } from '@/hooks/use-current-page-conditions'
import { cn } from '@/lib/utils.ts'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

export default function SimulationSelect() {
  const conditions = useCurrentPageConditions()
  const { groups, setGroups } = useSimulation()

  if (conditions === undefined || conditions.length === 0) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="min-w-[200px] justify-between">
          {groups === undefined || groups.length === 0 ? 'Simulation' : `Simulating ${groups.join(', ')}`}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Group Control" />
          <CommandEmpty className="p-2 text-sm">This group control is not in this page</CommandEmpty>
          <CommandGroup>
            {conditions.map((_, index) => {
              const groupControl = index + 1

              return (
                <CommandItem
                  key={groupControl}
                  value={`${groupControl}`}
                  onSelect={() => {
                    if (groups?.includes(groupControl)) {
                      setGroups(groups.filter((g) => g !== groupControl))

                      return
                    }

                    setGroups([...(groups ?? []), groupControl].sort((a, b) => a - b))
                  }}
                >
                  <CheckIcon
                    className={cn('mr-2 h-4 w-4', groups?.includes(groupControl) ? 'opacity-100' : 'opacity-0')}
                  />
                  {groupControl}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
